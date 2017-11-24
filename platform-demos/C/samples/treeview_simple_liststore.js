#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const GObject = imports.gi.GObject;
const Gtk = imports.gi.Gtk;
const Pango = imports.gi.Pango;

class TreeViewExample {
    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jstreeviewsimpleliststore'
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents window when active
    _onActivate() {
        this._window.present();
    }

    // Callback function for 'startup' signal builds the UI
    _onStartup() {
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {
        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            default_height: 250,
            default_width: 100,
            border_width: 20,
            title: "My Phone Book"});

        // Create the underlying liststore for the phonebook
        this._listStore = new Gtk.ListStore ();
        this._listStore.set_column_types ([
            GObject.TYPE_STRING,
            GObject.TYPE_STRING,
            GObject.TYPE_STRING,
            GObject.TYPE_STRING]);

        // Data to go in the phonebook
        let phonebook =
            [{ name: "Jurg", surname: "Billeter", phone: "555-0123",
                description: "A friendly person."},
             { name: "Johannes", surname: "Schmid", phone: "555-1234",
                description: "Easy phone number to remember."},
             { name: "Julita", surname: "Inca", phone: "555-2345",
                description: "Another friendly person."},
             { name: "Javier", surname: "Jardon", phone: "555-3456",
                description: "Bring fish for his penguins."},
             { name: "Jason", surname: "Clinton", phone: "555-4567",
                description: "His cake's not a lie."},
             { name: "Random J.", surname: "Hacker", phone: "555-5678",
                description: "Very random!"}];

        // Put the data in the phonebook
        for (let i = 0; i < phonebook.length; i++ ) {
            let contact = phonebook [i];
            this._listStore.set (this._listStore.append(), [0, 1, 2, 3],
                [contact.name, contact.surname, contact.phone, contact.description]);
        }

        // Create the treeview
        this._treeView = new Gtk.TreeView ({
            expand: true,
            model: this._listStore });

        // Create the columns for the address book
        let firstName = new Gtk.TreeViewColumn ({ title: "First Name" });
        let lastName = new Gtk.TreeViewColumn ({ title: "Last Name" });
        let phone = new Gtk.TreeViewColumn ({ title: "Phone Number" });

        // Create a cell renderer for when bold text is needed
        let bold = new Gtk.CellRendererText ({
            weight: Pango.Weight.BOLD });

        // Create a cell renderer for normal text
        let normal = new Gtk.CellRendererText ();

        // Pack the cell renderers into the columns
        firstName.pack_start (bold, true);
        lastName.pack_start (normal, true);
        phone.pack_start (normal, true);

        // Set each column to pull text from the TreeView's model
        firstName.add_attribute (bold, "text", 0);
        lastName.add_attribute (normal, "text", 1);
        phone.add_attribute (normal, "text", 2);

        // Insert the columns into the treeview
        this._treeView.insert_column (firstName, 0);
        this._treeView.insert_column (lastName, 1);
        this._treeView.insert_column (phone, 2);

        // Create the label that shows details for the name you select
        this._label = new Gtk.Label ({ label: "" });

        // Get which item is selected
        this.selection = this._treeView.get_selection();

        // When something new is selected, call _on_changed
        this.selection.connect ('changed', this._onSelectionChanged.bind(this));

        // Create a grid to organize everything in
        this._grid = new Gtk.Grid;

        // Attach the treeview and label to the grid
        this._grid.attach (this._treeView, 0, 0, 1, 1);
        this._grid.attach (this._label, 0, 1, 1, 1);

        // Add the grid to the window
        this._window.add (this._grid);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _onSelectionChanged() {
        // Grab a treeiter pointing to the current selection
        let [ isSelected, model, iter ] = this.selection.get_selected();

        // Set the label to read off the values stored in the current selection
        this._label.set_label ("\n" +
            this._listStore.get_value (iter, 0) + " " +
            this._listStore.get_value (iter, 1) + " " +
            this._listStore.get_value (iter, 2) + "\n" +
            this._listStore.get_value (iter, 3)
        );
    }
};

// Run the application
let app = new TreeViewExample ();
app.application.run (ARGV);
