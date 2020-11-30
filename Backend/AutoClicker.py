from pynput.keyboard import Controller as kController
from pynput.mouse import Controller as mController
from Backend.stack import LinkedList


class AutoClicker:
    def __init__(self):
        self.keyboard = kController()
        self.mouse = mController()
        self.instructions = LinkedList()

    def add_instruction(self, button):
        self.instructions.add_node(button)

    def remove_instruction(self):
        self.instructions.remove_node()

    def keyboard_press(self, key):
        self.keyboard.press(key)

    def mouse_click(self, button, n):
        self.mouse.click(button, n)

    def instruction_hash(self):
        pass

    def execute(self):
        curr = self.instructions.head
        if curr.next is None:
            return
        else:
            curr = curr.next

        while curr is not None:
            self.instruction_hash()
            curr = curr.next
