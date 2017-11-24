#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;

class ComboBoxExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application ({
            application_id: 'org.example.jscombobox'});

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
    _onActivate() {
        this._window.present ();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "Welcome to GNOME",
            default_width: 200,
            border_width: 10 });

        // Create the liststore to put our options in
        this._listStore = new Gtk.ListStore();
        this._listStore.set_column_types ([
            GObject.TYPE_STRING,
            GObject.TYPE_STRING]);

        // This array holds our list of options and their icons
        let options = [{ name: "Select" },
            { name: "New", icon: Gtk.STOCK_NEW },
            { name: "Open", icon: Gtk.STOCK_OPEN },
            { name: "Save", icon: Gtk.STOCK_SAVE }];

        // Put the options in the liststore
        for (let i = 0; i < options.length; i++ ) {
            let option = options[i];
            let iter = this._listStore.append();
            this._listStore.set (iter, [0], [option.name]);
            if ('icon' in option)
                this._listStore.set (iter, [1], [option.icon]);
        }

        // Create the combobox
        this._comboBox = new Gtk.ComboBox({
            model: this._listStore});

        // Create some cellrenderers for the items in each column
        let rendererPixbuf = new Gtk.CellRendererPixbuf();
        let rendererText = new Gtk.CellRendererText();

        // Pack the renderers into the combobox in the order we want to see
        this._comboBox.pack_start (rendererPixbuf, false);
        this._comboBox.pack_start (rendererText, false);

        // Set the renderers to use the information from our liststore
        this._comboBox.add_attribute (rendererText, "text", 0);
        this._comboBox.add_attribute (rendererPixbuf, "stock_id", 1);

        // Set the first row in the combobox to be active on startup
        this._comboBox.set_active (0);

        // Connect the combobox's 'changed' signal to our callback function
        this._comboBox.connect ('changed', this._onComboChanged.bind(this));

        // Add the combobox to the window
        this._window.add (this._comboBox);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _onComboChanged() {

        // The silly pseudohaiku that we'll use for our messagedialog
        let haiku = ["",
            "You ask for the new\nwith no thought for the aged\nlike fallen leaves trod.",
            "Like a simple clam\nrevealing a lustrous pearl\nit opens for you.",
            "A moment in time\na memory on the breeze\nthese things can't be saved."];

        // Which combobox item is active?
        let activeItem = this._comboBox.get_active();

        // No messagedialog if you choose "Select"
        if (activeItem != 0) {
            this._popUp = new Gtk.MessageDialog ({
                transient_for: this._window,
                modal: true,
                buttons: Gtk.ButtonsType.OK,
                message_type: Gtk.MessageType.INFO,
                text: haiku[activeItem]});

            // Connect the OK button to a handler function
            this._popUp.connect ('response', this._onDialogResponse.bind(this));

            // Show the messagedialog
            this._popUp.show();
        }

    }

    _onDialogResponse() {

        this._popUp.destroy ();

    }

};

// Run the application
let app = new ComboBoxExample ();
app.application.run (ARGV);
