#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

class ComboBoxTextExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application ({
            application_id: 'org.example.jscomboboxtext'});

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

        // Create the combobox
        this._comboBoxText = new Gtk.ComboBoxText();

        // Populate the combobox
        let distros = ["Select distribution", "Fedora", "Mint", "Suse"];
        for (let i = 0; i < distros.length; i++)
            this._comboBoxText.append_text (distros[i]);
        this._comboBoxText.set_active (0);

        // Connect the combobox's 'changed' signal to our callback function
        this._comboBoxText.connect ('changed', this._onComboChanged.bind(this));

        // Add the combobox to the window
        this._window.add (this._comboBoxText);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _onComboChanged() {

        // The responses we'll use for our messagedialog
        let responses = ["",
            "Fedora is a community distro sponsored by Red Hat.",
            "Mint is a popular distro based on Ubuntu.",
            "SUSE is a name shared by two separate distros."];

        // Which combobox item is active?
        let activeItem = this._comboBoxText.get_active();

        // No messagedialog if you chose "Select distribution"
        if (activeItem != 0) {
            this._popUp = new Gtk.MessageDialog ({
                transient_for: this._window,
                modal: true,
                buttons: Gtk.ButtonsType.OK,
                message_type: Gtk.MessageType.INFO,
                text: responses[activeItem]});

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
let app = new ComboBoxTextExample ();
app.application.run (ARGV);
