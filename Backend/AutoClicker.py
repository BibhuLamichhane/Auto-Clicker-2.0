from pynput.keyboard import Key, Controller as kController
from pynput.mouse import Button, Controller as mController
from stack import LinkedList
import threading
import time
import sys
from keylogger import Keylogger


class AutoClicker:
    def __init__(self):
        self.keyboard = kController()
        self.mouse = mController()
        self.instructions = LinkedList()
        self.special_keys = {
            'space': Key.space, 'enter': Key.enter, 'lalt':  Key.alt_l,
            'lshift': Key.shift_l, 'right': Key.right, 'left': Key.left,
            'down': Key.down, 'up': Key.up, 'esc': Key.esc, 'delete': Key.delete,
            'backspace': Key.backspace, 'tab': Key.tab, 'capslock': Key.caps_lock,
            'rshift': Key.shift_r, 'rctrl': Key.ctrl_r, 'ralt': Key.alt_r,
            'f1': Key.f1, 'f2': Key.f2, 'f3': Key.f3, 'f4': Key.f4,
            'f5': Key.f5, 'f6': Key.f6, 'f7': Key.f7, 'f8': Key.f8,
            'f9': Key.f9, 'f10': Key.f10, 'f11': Key.f11,
            'f12': Key.f12, 'leftClick': Button.left, 'rightClick': Button.right
        }

    def add_instruction(self, button):
        self.instructions.add_node(button)

    def remove_instruction(self):
        self.instructions.remove_node()

    def keyboard_press(self, vals, t, lbl):
        if lbl:
            print(f'Type {vals} letter by letter and pause for {t}')
            for v in vals:
                print(f'Typing {v} and pausing for {t}')
                # self.keyboard.press(v)
                # self.keyboard.release(v)
                time.sleep(t)
        elif len(vals) > 1:
            if self.special_keys.get(vals) is None:
                print(f'Type {vals} and pause for {t}')
                # self.keyboard.type(vals)
            else:
                print(f'Press {self.special_keys[vals]} and pause for {t}')
                # self.keyboard.press(self.special_keys[vals])
                # self.keyboard.release(self.special_keys[vals])
            time.sleep(t)
        else:
            print(f'Press {vals} and pause for {t}')
            # self.keyboard.press(vals)
            # self.keyboard.release(vals)
            time.sleep(t)

    def mouse_click(self, button, t, x=-1, y=-1):
        if x == -1:
            print(f'Clicking {self.special_keys[button]} and pausing for {t}')
            self.mouse.press(self.special_keys[button])
            self.mouse.release(self.special_keys[button])
            time.sleep(t)
        else:
            print(f'Clicking {self.special_keys[button]} at {x},{y} and pausing for {t} ')
            self.mouse.position = (x, y)
            self.mouse.press(self.special_keys[button])
            self.mouse.release(self.special_keys[button])
            time.sleep(t)

    def instruction_hash(self, node):
        instruction = node.data
        values = instruction.split(',')
        if 'Custom' in values:
            a, b, c, d = values
            if c == 'Letter By Letter':
                c = True
            else:
                c = False
            self.keyboard_press(b, int(d), c)
            # print(f'Type {b} pause for {int(d)} and {c} \n')
        elif 'Press' in values:
            a, b, c = values
            self.keyboard_press(b, int(c), False)
            # print(f'Press {b} pause for {int(c)} and {False}')
        elif 'Mouse' in values:
            if len(values) == 5:
                a, b, c, d, e = values
                self.mouse_click(b, int(e), c[2:], d[2:])
                # print(f'Click {b} pause for {int(e)} at {c[2:]} {d[2:]}')
            else:
                a, b, c = values
                self.mouse_click(b, int(c))
                # print(f'Click {b} pause for {int(c)}')

    def execute(self, r, kl):
        for _ in range(r):
            curr = self.instructions.head
            if curr.next is None:
                return
            else:
                curr = curr.next

            while curr is not None:
                if 'c' in kl.logs:
                    kl.flag = True
                    break
                self.instruction_hash(curr)
                curr = curr.next
            if kl.flag:
                break

instruct, repeat = sys.argv[1:]
ac = AutoClicker()
inst = ''

for i in instruct:
    inst += i

instructions = inst.split('|')
instructions = instructions[: len(instructions) - 1]

for i in range(1, len(instructions)):
    instructions[i] = instructions[i][1:]

print(instructions)

for i in instructions:
    ac.add_instruction(i)
kl = Keylogger()
thread1 = threading.Thread(target=kl.start)
thread2 = threading.Thread(target=ac.execute, args=[int(repeat), kl])

thread1.start()
thread2.start()
thread2.join()
thread1.join()
