import pynput
import pyautogui
import threading 
import time

# controls and color
control_thread = None
running = False

# mouse and target
target_pixel = (400, 400)
target_color = (75, 219, 106)
mouse = pynput.mouse.Controller()

def control():
    global running
    while (running):
        time.sleep(0.005)
        if (pyautogui.pixel(*target_pixel) == target_color):
            mouse.press(pynput.mouse.Button.left)
            mouse.release(pynput.mouse.Button.left)
            running = False
            hold.stop()
        time.sleep(0.005)

# switch
def on_click(x, y, button, pressed):
    global running, control_thread
    try:
        if (button == pynput.mouse.Button.left and pressed):
            mouse.position = target_pixel
            running = not running
            if running and (control_thread is None or not control_thread.is_alive()):
                control_thread = threading.Thread(target=control, daemon=True)
                control_thread.start()
        elif (button == pynput.mouse.Button.right and pressed):
            hold.stop()
    except AttributeError:
        pass

# listener to keep online
hold = pynput.mouse.Listener(on_click=on_click)
hold.start()
hold.join()