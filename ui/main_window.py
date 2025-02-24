from PySide6.QtWidgets import QMainWindow

from app import constants as C


class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle(C.APPLICATION_TITLE)
        self.setGeometry(*C.APPLICATION_INITIAL_GEOMETRY)

