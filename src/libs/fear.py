# fear.py
# Main launching script for biometric data input server
# Interfaces with the game through socket communication

# TODO: Deterimine a more direct interface

# Primary biomarker to track -> meditative states
# Muse is specialized hardware used to track mindfulness
# Muse: EEG -> Brain flow mindfulness model
# Muse: PPG -> heart rate variability (often used to gauge self regulation efforts)
# Camera: Face -> facial biomarkers for meditative states or other emotional states (Research needed)

from concurrent.futures import thread
from eeg import EEGDevice
from ppg import PPGAnalyze
from face import FaceDevice

import socket

HOST = "127.0.0.1" # local host
PORT = 5000

if __name__  == "__main__":
    eeg_weight = 0.8
    ppg_weight  = 0.2
    face_weight = 0


    eeg = EEGDevice()
    ppg = PPGAnalyze(eeg)
    face = FaceDevice()
    eeg.connect()

    # socket
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as soc:
        soc.bind((HOST, PORT))
        soc.listen()
        conn, addr = soc.accept()
        with conn:
            print(f"Connected!")
            while True:
                eeg.extract_data()
                metric = 0
                metric += eeg_weight * eeg.metric()
                metric += ppg_weight * ppg.metric()
                metric += face_weight * face.metric()
                conn.send(metric)
                thread.sleep(100)




