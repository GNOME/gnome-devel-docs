#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

class PanedExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({ application_id: 'org.example.panedexample' });

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
        this.window = new Gtk.ApplicationWindow  ({ application: this.application,
                                                    window_position: Gtk.WindowPosition.CENTER,
                                                    title: "Paned Window Example",
                                                    default_width: 450,
                                                    default_height: 350,
                                                    border_width: 10 });

        // a new widget with two adjustable panes,
        // one on the left and one on the right
        this.paned = Gtk.Paned.new(Gtk.Orientation.HORIZONTAL);

        // two images
        this.image1 = new Gtk.Image();
        this.image1.set_from_file("gnome-image.png");
        this.image2 = new Gtk.Image();
        this.image2.set_from_file("tux.png");

        // add the first image to the left pane
        this.paned.add1(this.image1);
        // add the second image to the right pane
        this.paned.add2(this.image2)

        // add the panes to the window
        this.window.add(this.paned)
        this.window.show_all();
    }
};

// Run the application
let app = new PanedExample();
app.application.run (ARGV);
