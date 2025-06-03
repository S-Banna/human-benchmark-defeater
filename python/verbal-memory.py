import pyautogui
import pytesseract
import pynput
import threading
import time

# track thread
control_thread = None

# Optional: set path if tesseract is not in PATH
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

# Get screen size
screen_width, screen_height = pyautogui.size()

# Define middle region 
box_width, box_height = 1920, 100
left = (screen_width - box_width) // 2
top = (screen_height - box_height) // 2
region = (left, top - 40, box_width, box_height)

# array of seen
arr = []
# default not running
running = False

# controller
def control():
    global running
    loops = 0
    while (running):
        time.sleep(0.0075)
        main()
        loops += 1
        time.sleep(0.0075)
        if (loops == 100):
            running = False
            listener.stop()

# switch
def on_press(key):
    global running, control_thread
    try:
        if (key.char == 'a'):
            running = not running
            if running and (control_thread is None or not control_thread.is_alive()):
                control_thread = threading.Thread(target=control, daemon=True)
                control_thread.start()
    except AttributeError:
        if key == pynput.keyboard.Key.esc:
            print("Kill switch triggered. Exiting...")
            running = False
            if listener:
                listener.stop()
        else:
            pass

# mouse control
mouse = pynput.mouse.Controller()

# main function
def main():
    global region, arr
    # Take screenshot of the region
    screenshot = pyautogui.screenshot(region=region)

    # Run OCR
    text = pytesseract.image_to_string(screenshot)
    print(text)

    # do the check
    if (text in arr):
        mouse.position = (900, 600)
        mouse.press(pynput.mouse.Button.left)
        mouse.release(pynput.mouse.Button.left)
    else:
        # add to array
        arr.append(text)
        # click on new
        mouse.position = (1000, 600)
        mouse.press(pynput.mouse.Button.left)
        mouse.release(pynput.mouse.Button.left)

# key listener
listener = pynput.keyboard.Listener(on_press=on_press)
listener.start()
listener.join()