# facial.py
# used to track facial bio markers and metrics for
# initialized on a seperate thread?
# metric is always a mindfulness metric

# TODO: research on feasability to be done
# use Cv2 to extract and manipulate image

class FaceDevice:
    def __init__(self):
        self.camera = None
    
    # num between 1 and 0
    def metric(self):
        return 0
