# eeg.py
# File contains eeg logic for interfacing with EEG devices
# Generates useful metrics from data streamed from muse

# notes ppg -> pulse oximeter
import time
from brainflow.board_shim import *
from brainflow.ml_model import *
from brainflow.data_filter import *

# use bled board if dongle is present
BOARD_ID = BoardIds.MUSE_2_BLED_BOARD
# BOARD_ID = BoardIds.MUSE_2_BOARD
# TODO: include port as an  arg to main script
SERIAL_PORT = "COM5"

class EEGDevice:
    def __init__(self, serial_port=SERIAL_PORT) -> None:
        # params
        BoardShim.enable_board_logger()
        self.params = BrainFlowInputParams()
        self.params.serial_port = serial_port
        self.data = []
        # ml init
        self.eeg_chann = BoardShim.get_eeg_channels(int(BOARD_ID))
        self.ppg_chann = BoardShim.get_ppg_channels(int(BOARD_ID))
        self.samp_rate = BoardShim.get_sampling_rate(int(BOARD_ID))
        mindfulness_params = BrainFlowModelParams(BrainFlowMetrics.MINDFULNESS.value,
                                                BrainFlowClassifiers.DEFAULT_CLASSIFIER.value)
        self.mindfulness = MLModel(mindfulness_params)
        self.mindfulness.prepare()
        
    def print_info(self):
        print(BoardShim.get_board_descr(BOARD_ID))
    
    def connect(self):
        self.board = BoardShim(BOARD_ID, self.params)
        self.board.prepare_session()
        self.board.start_stream()
        self.streaming = True

    # TODO: modify number of samples extracted from buffer
    # Must be called before metric or ppg_data
    def extract_data(self):
        self.data = self.board.get_board_data()
    
    # num between 1 and 0
    def metric(self):
        if not self.streaming or not self.data:
            return -1
        bands = DataFilter.get_avg_band_powers(self.data, self.eeg_chann, self.samp_rate, True)
        features = bands[0]
        return self.mindfulness.predict(features)
    
    def ppg_data(self):
        if not self.streaming or not self.data:
            return -1
        return self.data[self.ppg_chan] 

if __name__ == "__main__":
    dev = EEGDevice()
    dev.connect()
    dev.print_info()
    time.sleep(1)
    data = dev.board.get_board_data()
    print(data)
    print(len(data))