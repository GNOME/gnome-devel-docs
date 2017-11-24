#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

class RadioButtonExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsradiobutton',
            flags: Gio.ApplicationFlags.FLAGS_NONE
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
            border_width: 20,
            title: "Travel Planning"});

        // Create a label for the first group of buttons
        this._placeLabel = new Gtk.Label ({label: "Where would you like to travel to?"});

        // Create three radio buttons three different ways
        this._place1 = new Gtk.RadioButton ({label: "The Beach"});

        this._place2 = Gtk.RadioButton.new_from_widget (this._place1);
        this._place2.set_label ("The Moon");

        this._place3 = Gtk.RadioButton.new_with_label_from_widget (this._place1, "Antarctica");
        // this._place3.set_active (true);

        // Create a label for the second group of buttons
        this._thingLabel = new Gtk.Label ({label: "And what would you like to bring?" });

        // Create three more radio buttons
        this._thing1 = new Gtk.RadioButton ({label: "Penguins" });
        this._thing2 = new Gtk.RadioButton ({label: "Sunscreen", group: this._thing1 });
        this._thing3 = new Gtk.RadioButton ({label: "A spacesuit", group: this._thing1 });

        // Create a stock OK button
        this._okButton = new Gtk.Button ({
            label: 'gtk-ok',
            use_stock: 'true',
            halign: Gtk.Align.END });

        // Connect the button to the function which handles clicking it
        this._okButton.connect ('clicked', this._okClicked.bind(this));

        // Create a grid to put the "place" items in
        this._places = new Gtk.Grid ();

        // Attach the "place" items to the grid
        this._places.attach (this._placeLabel, 0, 0, 1, 1);
        this._places.attach (this._place1, 0, 1, 1, 1);
        this._places.attach (this._place2, 0, 2, 1, 1);
        this._places.attach (this._place3, 0, 3, 1, 1);

        // Create a grid to put the "thing" items in
        this._things = new Gtk.Grid ({ margin_top: 50 });

        // Attach the "thing" items to the grid
        this._things.attach (this._thingLabel, 0, 0, 1, 1);
        this._things.attach (this._thing1, 0, 1, 1, 1);
        this._things.attach (this._thing2, 0, 2, 1, 1);
        this._things.attach (this._thing3, 0, 3, 1, 1);

        // Create a grid to put everything in
        this._grid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            margin_left: 40,
            margin_right: 50 });

        // Attach everything to the grid
        this._grid.attach (this._places, 0, 0, 1, 1);
        this._grid.attach (this._things, 0, 1, 1, 1);
        this._grid.attach (this._okButton, 0, 2, 1, 1);

        // Add the grid to the window
        this._window.add (this._grid);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _okClicked() {

        // Create a popup that shows a silly message
        this._travel = new Gtk.MessageDialog ({
            transient_for: this._window,
            modal: true,
            message_type: Gtk.MessageType.OTHER,
            buttons: Gtk.ButtonsType.OK,
            text: this._messageText() });

        // Show the popup
        this._travel.show();

        // Bind the OK button to the function that closes the popup
        this._travel.connect ("response", this._clearTravelPopUp.bind(this));

    }

    _messageText() {

        // Create a silly message for the popup depending on what you selected
        var stringMessage = "";

        if (this._place1.get_active()) {

            if (this._thing1.get_active())
                stringMessage = "Penguins love the beach, too!";

            else if (this._thing2.get_active())
                stringMessage = "Make sure to put on that sunscreen!";

            else stringMessage = "Are you going to the beach in space?";

        }

        else if (this._place2.get_active()) {

            if (this._thing1.get_active())
                stringMessage = "The penguins will take over the moon!";

            else if (this._thing2.get_active())
                stringMessage = "A lack of sunscreen will be the least of your problems!";

            else stringMessage = "You'll probably want a spaceship, too!";
        }

        else if (this._place3.get_active()) {

            if (this._thing1.get_active())
                stringMessage = "The penguins will be happy to be back home!";

            else if (this._thing2.get_active())
                stringMessage = "Antarctic sunbathing may be hazardous to your health!";

            else stringMessage = "Try bringing a parka instead!";
        }

        return stringMessage;

    }

    _clearTravelPopUp() {
        this._travel.destroy();
    }
};

// Run the application
let app = new RadioButtonExample ();
app.application.run (ARGV);
