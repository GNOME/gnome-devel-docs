from gi.repository import Gtk
from gi.repository import Gdk
from gi.repository import Gio
import sys


class MyWindow(Gtk.ApplicationWindow):

    def __init__(self, app):
        Gtk.Window.__init__(
            self, title="Toolbar with Tooltips Example", application=app)
        self.set_default_size(400, 200)

        grid = Gtk.Grid()

        toolbar = self.create_toolbar()
        toolbar.set_hexpand(True)
        toolbar.show()

        grid.attach(toolbar, 0, 0, 1, 1)

        self.add(grid)

        undo_action = Gio.SimpleAction.new("undo", None)
        undo_action.connect("activate", self.undo_callback)
        self.add_action(undo_action)

        fullscreen_action = Gio.SimpleAction.new("fullscreen", None)
        fullscreen_action.connect("activate", self.fullscreen_callback)
        self.add_action(fullscreen_action)

    def create_toolbar(self):
        toolbar = Gtk.Toolbar()
        toolbar.get_style_context().add_class(Gtk.STYLE_CLASS_PRIMARY_TOOLBAR)

        # button for the "new" action
        new_button = Gtk.ToolButton.new_from_stock(Gtk.STOCK_NEW)
        # with a tooltip with a given text
        new_button.set_tooltip_text("Create a new file")
        new_button.set_is_important(True)
        toolbar.insert(new_button, 0)
        new_button.show()
        new_button.set_action_name("app.new")

        # button for the "open" action
        open_button = Gtk.ToolButton.new_from_stock(Gtk.STOCK_OPEN)
        # with a tooltip with a given text in the Pango markup language
        open_button.set_tooltip_markup("Open an <i>existing</i> file")
        open_button.set_is_important(True)
        toolbar.insert(open_button, 1)
        open_button.show()
        open_button.set_action_name("app.open")

        # button for the "undo" action
        undo_button = Gtk.ToolButton.new_from_stock(Gtk.STOCK_UNDO)
        # with a tooltip with an image
        # set True the property "has-tooltip"
        undo_button.set_property("has-tooltip", True)
        # connect to the callback function that for the tooltip
        # with the signal "query-tooltip"
        undo_button.connect("query-tooltip", self.undo_tooltip_callback)
        undo_button.set_is_important(True)
        toolbar.insert(undo_button, 2)
        undo_button.show()
        undo_button.set_action_name("win.undo")

        # button for the "fullscreen/leave fullscreen" action
        self.fullscreen_button = Gtk.ToolButton.new_from_stock(
            Gtk.STOCK_FULLSCREEN)
        self.fullscreen_button.set_is_important(True)
        toolbar.insert(self.fullscreen_button, 3)
        self.fullscreen_button.set_action_name("win.fullscreen")

        return toolbar

    # the callback function for the tooltip of the "undo" button
    def undo_tooltip_callback(self, widget, x, y, keyboard_mode, tooltip):
        # set the text for the tooltip
        tooltip.set_text("Undo your last action")
        # set an icon for the tooltip
        tooltip.set_icon_from_stock("gtk-undo", Gtk.IconSize.MENU)
        # show the tooltip
        return True

    def undo_callback(self, action, parameter):
        print("You clicked \"Undo\".")

    def fullscreen_callback(self, action, parameter):
        is_fullscreen = self.get_window().get_state(
        ) & Gdk.WindowState.FULLSCREEN != 0
        if not is_fullscreen:
            self.fullscreen_button.set_stock_id(Gtk.STOCK_LEAVE_FULLSCREEN)
            self.fullscreen()
        else:
            self.fullscreen_button.set_stock_id(Gtk.STOCK_FULLSCREEN)
            self.unfullscreen()


class MyApplication(Gtk.Application):

    def __init__(self):
        Gtk.Application.__init__(self)

    def do_activate(self):
        win = MyWindow(self)
        win.show_all()

    def do_startup(self):
        Gtk.Application.do_startup(self)

        new_action = Gio.SimpleAction.new("new", None)
        new_action.connect("activate", self.new_callback)
        app.add_action(new_action)

        open_action = Gio.SimpleAction.new("open", None)
        open_action.connect("activate", self.open_callback)
        app.add_action(open_action)

    def new_callback(self, action, parameter):
        print("You clicked \"New\".")

    def open_callback(self, action, parameter):
        print("You clicked \"Open\".")

app = MyApplication()
exit_status = app.run(sys.argv)
sys.exit(exit_status)
