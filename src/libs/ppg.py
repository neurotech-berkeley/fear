# ppg.py
# PPG analysis module to determine heart rate variability
# determine other valuable metrics that inform mental states

# TODO: research needed into HRV and its calculation using PPG data

from eeg import EEGDevice
import numpy as np

class PPGAnalyze:
    def __init__(self, device: EEGDevice, buff_size):
        self.device = device
        # TODO: find out if theres is a more direct way to  measure HRV
        # from a single data poll
        self.data_buffer = []
        self.buff_size = buff_size
    
    def heart_rate(self):
        self.device.ppg_data()
        # ....
        return 0
    
    # num between 1 and 0
    def metric(self):
        self.data_buffer.append(self.heart_rate())
        if len(self.data_buffer) < self.buff_size:
            return 0
        # TODO: scale
        return np.var(self.data_buffer)