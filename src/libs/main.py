# main script

import eeg

def init():
    device = EEGDevice()
    device.connect()
    return device

def calibration(device):
    print("Calibrating")
    print("Do what you do!")

    device.metric()
    