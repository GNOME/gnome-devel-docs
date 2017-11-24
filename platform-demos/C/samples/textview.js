#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

class TextViewExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jstextview'
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents windows when active
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
        this._window = new Gtk.ApplicationWindow  ({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            title: "Talk to a Penguin",
            default_height: 400,
            default_width: 440,
            border_width: 20 });

        // Create a label for the penguin to talk to you
        this._penguin = new Gtk.Label ({
            height_request: 180,
            width_request: 400,
            label: "Squaaaak?",
            wrap: true });

        // Create a textview for you to talk to the penguin
        this.buffer = new Gtk.TextBuffer();
        this._textView = new Gtk.TextView ({
            buffer: this.buffer,
            editable: true,
            wrap_mode: Gtk.WrapMode.WORD });

        // Create a "scrolled window" to put your textview in so it will scroll
        this._scrolled = new Gtk.ScrolledWindow ({
            hscrollbar_policy: Gtk.PolicyType.AUTOMATIC,
            vscrollbar_policy: Gtk.PolicyType.AUTOMATIC,
            shadow_type: Gtk.ShadowType.ETCHED_IN,
            height_request: 180,
            width_request: 400, });

        // Put the textview into the scrolled window
        this._scrolled.add_with_viewport (this._textView);

        // Create a grid to organize them in
        this._grid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });

        // Put the label and textview in the grid one on top of the other
        this._grid.attach (this._penguin, 0, 0, 1, 1);
        this._grid.attach (this._scrolled, 0, 1, 1, 1);

        // Create a button to send your message to the penguin
        this._send = new Gtk.Button ({
            halign: Gtk.Align.END,
            margin_top: 20,
            label: "Send" });
        this._send.connect ('clicked', this._chat.bind(this));

        // Create a grid that will have the other grid on top and the button on bottom
        this._mainGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });

        // Add the other grid and the button to the main grid
        this._mainGrid.attach (this._grid, 0, 0, 1, 1);
        this._mainGrid.attach (this._send, 0, 1, 1, 1);

        // Attach the main grid to the window
        this._window.add (this._mainGrid);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _chat() {

        // Create a random number to determine what the penguin says
        this.number = Math.floor ((Math.random() * 3) + 1);

        // Did you actually say anything?
        if (this.buffer.text) {

            // Did you mention fish?
            if (this.buffer.text.match (/fish/gi)) {

                // Have the penguin squaak about fish
                if (this.number == 1)
                    this._penguin.set_label ("FISH!");

                else if (this.number == 2)
                    this._penguin.set_label ("Fish fish fish fish. Fish!");

                else
                    this._penguin.set_label ("Fish? Fish fish fish. Fish fish. FISH!");

            }

            // I guess you didn't mention fish
            else {

                // Have the penguin talk about penguinny stuff
                if (this.number == 1)
                    this._penguin.set_label ("SQUAAK!");

                else if (this.number == 2)
                    this._penguin.set_label ("Ork ork ork ork squaak. Squaak squaak! *waves flippers*");

                else
                    this._penguin.set_label ("Ork ork ork ork ork?");

            }

        }

        // Clear the buffer
        this.buffer.text = "";

        // Give focus back to the textview so you don't have to click it again
        this._textView.has_focus = true;
    }
};

// Run the application
let app = new TextViewExample ();
app.application.run (ARGV);
