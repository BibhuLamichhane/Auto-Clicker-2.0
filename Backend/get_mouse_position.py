from pynput.mouse import Controller
import time

mouse = Controller()
time.sleep(3)
print(mouse.position)
