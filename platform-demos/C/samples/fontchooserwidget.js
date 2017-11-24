//!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';
const Gtk = imports.gi.Gtk;

class FontChooserWidgetExample {

    // Create the application itthis
    constructor() {
        this.application = new Gtk.Application({ application_id: 'org.example.fontchooserwidget' });

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
                                                    title: "FontChooserWidget",
                                                    default_width: 200,
                                                    default_height: 200,
                                                    border_width: 10 });

        this.fontChooser = new Gtk.FontChooserWidget();
        // a default font
        this.fontChooser.set_font("Sans");
        // a text to preview the font
        this.fontChooser.set_preview_text("This is an example of preview text!");

        // connect signal from the font chooser to the callback function
        this.fontChooser.connect("notify::font", this._fontCb.bind(this));

        // add the font chooser to the window
        this.window.add(this.fontChooser);
        this.window.show_all();
   }

     // callback function:
     _fontCb() {
        // print in the terminal
        print("You chose the font " + this.fontChooser.get_font());
    }
};

// Run the application
let app = new FontChooserWidgetExample();
app.application.run (ARGV);
