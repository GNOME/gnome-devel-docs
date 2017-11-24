#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

class ScaleExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsscale'
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
            title: "Birds on a Floe"});

        // Create the horizontal scale
        this._hScale = Gtk.Scale.new_with_range (Gtk.Orientation.HORIZONTAL, 0.0, 100.0, 5.0);
        this._hScale.set_valign (Gtk.Align.START);
        this._hScale.set_value (50);
        this._hScale.set_digits (0);
        // this._hScale.set_draw_value (false);

        // Create a master adjustment to use for the vertical (or any other) scale
        this._adjustment = new Gtk.Adjustment ({
            value: 95,
            lower: 0,
            upper: 100,
            step_increment: 5,
            page_increment: 10 });

        // Create a vertical scale using the adjustment we just made
        this._vScale = new Gtk.Scale ({
            orientation: Gtk.Orientation.VERTICAL,
            adjustment: this._adjustment,
            digits: 0,
            // draw_value: false,
            margin_left: 10 });

        // Create the label that shows the product of the two values
        this._product = (this._hScale.get_value() * this._vScale.get_value());
        this._label = new Gtk.Label ({
            label: (String(this._product) + " penguins on the iceberg."),
            height_request: 200,
            width_request: 200,
            wrap: true});

        // Connect the two scales to functions which recalculate the label
        this._hScale.connect ("value-changed", this._recalc.bind(this));
        this._vScale.connect ("value-changed", this._recalc.bind(this));

        // Create a grid to arrange things in
        this._UIGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            margin_top: 20,
            margin_left: 20});

        // Attach everything to the grid
        this._UIGrid.attach (this._label, 0, 0, 1, 1);
        this._UIGrid.attach (this._hScale, 0, 1, 1, 1);
        this._UIGrid.attach (this._vScale, 1, 0, 1, 1);

        // Add the grid to the window
        this._window.add (this._UIGrid);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _recalc() {

        // Figure out what the product of the two scales' values is
        var product = (this._hScale.get_value() * this._vScale.get_value());

        // Create a blank comment line in case there isn't a silly comment to make
        var comment = "";

        // Make a silly comment based on the number of penguins
        if (product > 9000) {
            comment = "It's over 9000!";
        }
        else if (product < 1000 && product > 0) {
            comment = "They're getting lonely.";
        }
        else if (product == 0) {
            comment = "They're all gone ...";
        }
        else comment = "";

        // Set ._label's new text
        this._label.set_label (String (product) + " penguins on the iceberg. " + comment);
    }
};

// Run the application
let app = new ScaleExample ();
app.application.run (ARGV);
