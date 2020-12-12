from pynput import mouse
from pynput import keyboard
import threading


def on_move(x, y):
    print(f'{x, y}')


def on_click(x, y, button, pressed):
    print(f'{x, y}')
    if button == mouse.Button.right:
        return False


def on_scroll(x, y, dx, dy):
    # print('Scrolled {0} at {1}'.format(
    #     'down' if dy < 0 else 'up',
    #     (x, y)))
    pass


def on_press(key):
    print(f'{key}')


def on_release(key):
    if key == keyboard.Key.esc:
        # Stop listener
        return False


def keyboard_listener():
    with keyboard.Listener(
            on_press=on_press,
            on_release=on_release) as listener:
        listener.join()

    listener = keyboard.Listener(
        on_press=on_press,
        on_release=on_release)
    listener.start()


def mouse_listener():
    with mouse.Listener(
            on_move=on_move,
            on_click=on_click,
            on_scroll=on_scroll) as listener:
        listener.join()

    listener = mouse.Listener(
        on_move=on_move,
        on_click=on_click,
        on_scroll=on_scroll)
    listener.start()


t1 = threading.Thread(target=mouse_listener)
t2 = threading.Thread(target=keyboard_listener)

t1.start()
t2.start()

t1.join()
t2.join()