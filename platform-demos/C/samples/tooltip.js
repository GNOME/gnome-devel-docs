//!/usr/bin/gjs

imports.gi.versions.Gdk = '3.0';
imports.gi.versions.Gtk = '3.0';

const Gdk = imports.gi.Gdk;
const GLib = imports.gi.GLib;
const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk; 

class TooltipExample {
    // Create the application 
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jstooltip'
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this.window.present();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this.window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "Toolbar with Tooltips Example",
            default_width: 400,
            default_height: 200,
            border_width: 10
        });

        this.grid = new Gtk.Grid();

        this.toolbar = this._createToolbar();
        this.toolbar.set_hexpand(true);
        this.toolbar.show();

        this.grid.attach(this.toolbar, 0, 0, 1, 1);

        this.window.add(this.grid);

        this._newAction = new Gio.SimpleAction({ name: "new" });
        this._newAction.connect("activate", this._newCallback.bind(this));
        this.window.add_action(this._newAction);

        this._openAction = new Gio.SimpleAction({ name: "open" });
        this._openAction.connect("activate", this._openCallback.bind(this));
        this.window.add_action(this._openAction);

        this._undoAction = new Gio.SimpleAction({ name: "undo" });
        this._undoAction.connect("activate", this._undoCallback.bind(this));
        this.window.add_action(this._undoAction);

        this._fullScreenAction = new Gio.SimpleAction({ name: "fullscreenToggle" });
        this._fullScreenAction.connect("activate",
                                       this._fullScreenCallback.bind(this));
        this.window.add_action(this._fullScreenAction);

        this.window.show_all();
    }

    _createToolbar() {
        this.toolbar = new Gtk.Toolbar();
        this.toolbar.get_style_context().add_class(Gtk.STYLE_CLASS_PRIMARY_TOOLBAR);

        // button for the "new" action
        this.newButton = Gtk.ToolButton.new_from_stock(Gtk.STOCK_NEW);
        // with a tooltip with a given text        
        this.newButton.set_tooltip_text("Create a new file");
        this.newButton.set_is_important(true);
        this.toolbar.insert(this.newButton, 0);
        this.newButton.show();
        this.newButton.set_action_name("win.new");

        // button for the "open" action
        this.openButton = Gtk.ToolButton.new_from_stock(Gtk.STOCK_OPEN);
        // with a tooltip with a given text in the Pango markup language        
        this.openButton.set_tooltip_markup("Open an <i>existing</i> file");
        this.openButton.set_is_important(true);
        this.toolbar.insert(this.openButton, 1);
        this.openButton.show();
        this.openButton.set_action_name("win.open");

        // button for the "undo" action
        this.undoButton = Gtk.ToolButton.new_from_stock(Gtk.STOCK_UNDO);
        // with a tooltip with an image
        // set true the property "has-tooltip"        
        this.undoButton.set_property("has-tooltip", true);
        // connect to the callback function that for the tooltip
        // with the signal "query-tooltip"
        this.undoButton.connect("query-tooltip", this._undoTooltipCallback.bind(this));
        this.undoButton.set_is_important(true);
        this.toolbar.insert(this.undoButton, 2);
        this.undoButton.show();
        this.undoButton.set_action_name("win.undo");

        // button for the "fullscreen/leave fullscreen" action
        this.fullscreenButton = Gtk.ToolButton.new_from_stock(Gtk.STOCK_FULLSCREEN);
        this.fullscreenButton.set_is_important(true);
        this.toolbar.insert(this.fullscreenButton, 3);
        this.fullscreenButton.set_action_name("win.fullscreenToggle");

        return this.toolbar;
    }

    _newCallback(action, parameter) {
        print("You clicked \"New\".");
    }

    _openCallback(action, parameter) {
        print("You clicked \"Open\".");
    }

    // the callback function for the tooltip of the "undo" button
    _undoTooltipCallback(widget, x, y, keyboard_mode, tooltip) {
        // set the text for the tooltip
        tooltip.set_text("Undo your last action");
        // set an icon fot the tooltip
        tooltip.set_icon_from_stock(Gtk.STOCK_UNDO, Gtk.IconSize.MENU);
        // show the tooltip
        return true;
    }

    _undoCallback(action, parameter) {
        print("You clicked \"Undo\".");
    }

    _fullScreenCallback() {
        if ((this.window.get_window().get_state() & Gdk.WindowState.FULLSCREEN) != 0 ){
            this.fullscreenButton.set_stock_id(Gtk.STOCK_FULLSCREEN);
            this.fullscreenButton.set_tooltip_text("Make your window fullscreen");
            this.window.unfullscreen();
        } else {
            this.fullscreenButton.set_stock_id(Gtk.STOCK_LEAVE_FULLSCREEN);
            this.fullscreenButton.set_tooltip_text("Leave fullscreen");
            this.window.fullscreen();
        }
    }
};

// Run the application
let app = new TooltipExample ();
app.application.run (ARGV);
