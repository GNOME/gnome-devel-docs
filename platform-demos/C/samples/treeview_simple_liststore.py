from gi.repository import Gtk
from gi.repository import Pango
import sys

columns = ["First Name",
           "Last Name",
           "Phone Number"]

phonebook = [["Jurg", "Billeter", "555-0123"],
             ["Johannes", "Schmid", "555-1234"],
             ["Julita", "Inca", "555-2345"],
             ["Javier", "Jardon", "555-3456"],
             ["Jason", "Clinton", "555-4567"],
             ["Random J.", "Hacker", "555-5678"]]


class MyWindow(Gtk.ApplicationWindow):

    def __init__(self, app):
        Gtk.Window.__init__(self, title="My Phone Book", application=app)
        self.set_default_size(250, 100)
        self.set_border_width(10)

        # the data in the model (three strings for each row, one for each
        # column)
        listmodel = Gtk.ListStore(str, str, str)
        # append the values in the model
        for i in range(len(phonebook)):
            listmodel.append(phonebook[i])

        # a treeview to see the data stored in the model
        view = Gtk.TreeView(model=listmodel)
        # for each column
        for i, column in enumerate(columns):
            # cellrenderer to render the text
            cell = Gtk.CellRendererText()
            # the text in the first column should be in boldface
            if i == 0:
                cell.props.weight_set = True
                cell.props.weight = Pango.Weight.BOLD
            # the column is created
            col = Gtk.TreeViewColumn(column, cell, text=i)
            # and it is appended to the treeview
            view.append_column(col)

        # when a row is selected, it emits a signal
        view.get_selection().connect("changed", self.on_changed)

        # the label we use to show the selection
        self.label = Gtk.Label()
        self.label.set_text("")

        # a grid to attach the widgets
        grid = Gtk.Grid()
        grid.attach(view, 0, 0, 1, 1)
        grid.attach(self.label, 0, 1, 1, 1)

        # attach the grid to the window
        self.add(grid)

    def on_changed(self, selection):
        # get the model and the iterator that points at the data in the model
        (model, iter) = selection.get_selected()
        # set the label to a new value depending on the selection
        self.label.set_text("\n %s %s %s" %
                            (model[iter][0],  model[iter][1], model[iter][2]))
        return True


class MyApplication(Gtk.Application):

    def __init__(self):
        Gtk.Application.__init__(self)

    def do_activate(self):
        win = MyWindow(self)
        win.show_all()

    def do_startup(self):
        Gtk.Application.do_startup(self)

app = MyApplication()
exit_status = app.run(sys.argv)
sys.exit(exit_status)
