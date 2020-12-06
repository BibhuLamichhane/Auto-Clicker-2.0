from pynput.keyboard import Key, Controller as kController
from pynput.mouse import Button, Controller as mController
from stack import LinkedList
import time as t
import sys


class AutoClicker:

    def __init__(self):
        self.keyboard = kController()
        self.mouse = mController()
        self.instructions = LinkedList()
        self.special_keys = {
            'space': Key.space,
            'enter': Key.enter,
            'lalt':  Key.alt_l,
            'lshift': Key.shift_l,
            'right': Key.right,
            'left': Key.left,
            'down': Key.down,
            'up': Key.up,
            'esc': Key.esc,
            'delete': Key.delete,
            'backspace': Key.backspace,
            'tab': Key.tab,
            'capslock': Key.caps_lock,
            'rshift': Key.shift_r,
            'rctrl': Key.ctrl_r,
            'ralt': Key.alt_r,
            'f1': Key.f1,
            'f2': Key.f2,
            'f3': Key.f3,
            'f4': Key.f4,
            'f5': Key.f5,
            'f6': Key.f6,
            'f7': Key.f7,
            'f8': Key.f8,
            'f9': Key.f9,
            'f10': Key.f10,
            'f11': Key.f11,
            'f12': Key.f12,
            'leftClick': Button.left,
            'rightClick': Button.right
        }

    def add_instruction(self, button):
        self.instructions.add_node(button)

    def remove_instruction(self):
        self.instructions.remove_node()

    def keyboard_press(self, vals, t, lbl):
        if lbl:
            for v in vals:
                self.keyboard.press(v)
                time.sleep(t)
        elif len(vals) > 1:
            if self.special_keys[vals] is None:
                self.keyboard.type(vals)
            else:
                self.keyboard.press(self.special_keys[vals])
            time.sleep(t)
        else:
            self.keyboard.press(vals)
            time.sleep(t)

    def mouse_click(self, button, t, x=-1, y=-1):
        if x == -1:
            self.mouse.click(self.special_keys[button])
            t.sleep(t)
        else:
            self.mouse.position = (x, y)
            self.mouse.click(self.special_keys(button))
            t.sleep(t)

    def instruction_hash(self, node):
        instruction = node.data
        values = instruction.split(',')
        if 'Custom' in values:
            a, b, c, d = values
            if c == 'Letter By Letter':
                c = True
            else:
                c = False
            # self.keyboard(b, int(d), c)
            print(f'Type {b} pause for {int(d)} and {c} \n')
        elif 'Press' in values:
            a, b, c = values
            # self.keyboard(b, int(c), False)
            print(f'Press {b} pause for {int(c)} and {False}')
        elif 'Mouse' in values:
            if len(values) == 5:
                a, b, c, d, e = values
                # self.mouse_click(b, int(e), c[2:], d[2:])
                print(f'Click {b} pause for {int(e)} at {c[2:]} {d[2:]}')
            else:
                a, b, c = values
                # self.mouse_click(b, int(c))
                print(f'Click {b} pause for {int(c)}')

    def execute(self):
        curr = self.instructions.head
        if curr.next is None:
            return
        else:
            curr = curr.next

        while curr is not None:
            print(curr)
            # self.instruction_hash(curr)
            curr = curr.next


instructions, repeat, instruction_lengths = sys.argv[1:]
ac = AutoClicker()

print(instructions, ' from python')

for i in instructions:
    ac.add_instruction(i)

# ac.execute()
