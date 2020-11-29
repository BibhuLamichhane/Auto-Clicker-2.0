class Node:
    def __init__(self, data=''):
        self.data = data
        self.previous = None
        self.next = None


class LinkedList:
    def __init__(self):
        self.head = Node()

    def add_node(self, data):
        curr = self.head
        new_node = Node(data)

        while curr.next is not None:
            curr = curr.next

        curr.next = new_node
        new_node.previous = curr

    def remove_node(self):
        curr = self.head
        if self.head.next is None:
            return
        else:
            while curr.next is not None:
                curr = curr.next
            curr.previous.next = None
            del curr

