from pynput.keyboard import Controller as kController
from pynput.mouse import Controller as mController
from stack import LinkedList
import time as t
import sys


class AutoClicker:
    def __init__(self):
        self.keyboard = kController()
        self.mouse = mController()
        self.instructions = LinkedList()

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
            self.keyboard.type(vals)
            time.sleep(t)
        else:
            self.keyboard.press(vals)
            time.sleep(t)

    def mouse_click(self, button, time, x=-1, y=-1):
        if x == -1:
            self.mouse.click(button)
            t.sleep(time)
        else:
            self.mouse.position = (x, y)
            self.mouse.click(button)
            t.sleep(time)

    def instruction_hash(self, node):
        instruction = node.data
        values = instruction.split(',')
        if 'Custom' in values:
            pass
        elif 'Press' in values:
            pass
        else:
            if 'X' in values:
                pass
            else:
                pass

    def execute(self):
        curr = self.instructions.head
        if curr.next is None:
            return
        else:
            curr = curr.next

        while curr is not None:
            self.instruction_hash(curr)
            curr = curr.next


instructions, repeat = sys.argv[1:]
ac = AutoClicker()

print(len(instructions), instructions[0])

for i in instructions:
    ac.add_instruction(i)
