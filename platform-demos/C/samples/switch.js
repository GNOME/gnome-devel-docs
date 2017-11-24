#!/usr/bin/gjs

imports.gi.versions.Gtk = '3.0';

const Gio = imports.gi.Gio;
const Gtk = imports.gi.Gtk;

class SwitchExample {

    // Create the application itself
    constructor() {
        this.application = new Gtk.Application({
            application_id: 'org.example.jsswitch'
        });

        // Connect 'activate' and 'startup' signals to the callback functions
        this.application.connect('activate', this._onActivate.bind(this));
        this.application.connect('startup', this._onStartup.bind(this));
    }

    // Callback function for 'activate' signal presents window when active
    _onActivate() {
        this._window.present();
    }

    // Callback function for 'startup' signal creates the menu and builds the UI
    _onStartup() {
        this._initMenus();
        this._buildUI();
    }

    // Build the application's UI
    _buildUI() {

        // Create the application window
        this._window = new Gtk.ApplicationWindow({
            application: this.application,
            window_position: Gtk.WindowPosition.CENTER,
            border_width: 20,
            title: "Animal Creator"});

        // Create the image widget and set its default picture
        this._image = new Gtk.Image ({file: "redfox.png"});

        // Create a label for the first switch
        this._flyLabel = new Gtk.Label ({
            label: "Make it fly",
            margin_right: 30});

        // Create the first switch and set its default position
        this._flySwitch = new Gtk.Switch ({active: false});
        this._flySwitch.connect ('notify::active', this._switchFlip.bind(this));

        // Create a label for the second switch
        this._birdLabel = new Gtk.Label ({
            label: "Make it a bird",
            margin_right: 30});

        // Create the second switch
        this._birdSwitch = new Gtk.Switch ({active: false});
        this._birdSwitch.connect ('notify::active', this._switchFlip.bind(this));

        // Create a grid for the labels and switches beneath the picture
        this._UIGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER,
            margin_top: 20});

        // Attach the labels and switches to that grid
        this._UIGrid.attach (this._flyLabel, 0, 0, 1, 1);
        this._UIGrid.attach (this._flySwitch, 1, 0, 1, 1);
        this._UIGrid.attach (this._birdLabel, 0, 1, 1, 1);
        this._UIGrid.attach (this._birdSwitch, 1, 1, 1, 1);

        // Create a master grid to put both the UI and the picture into
        this._mainGrid = new Gtk.Grid ({
            halign: Gtk.Align.CENTER,
            valign: Gtk.Align.CENTER });

        // Attach the picture and the UI grid to the master grid
        this._mainGrid.attach (this._image, 0, 0, 1, 1);
        this._mainGrid.attach (this._UIGrid, 0, 1, 1, 1);

        // Add the master grid to the window
        this._window.add (this._mainGrid);

        // Show the window and all child widgets
        this._window.show_all();
    }

    _switchFlip() {

        // Change the picture depending on which switches are flipped
        if (this._flySwitch.get_active()) {

            if (this._birdSwitch.get_active())
                this._image.set_from_file ("muteswan.png");
            else
                this._image.set_from_file ("fruitbat.png");
        } else {

            if (this._birdSwitch.get_active())
                this._image.set_from_file ("gentoopenguin.png");
            else
                this._image.set_from_file ("redfox.png");
        }
    }

    _initMenus() {

        // Build the application's menu so we can have an "About" button
        let menu = new Gio.Menu();
        menu.append("About", 'app.about');
        menu.append("Quit",'app.quit');
        this.application.set_app_menu(menu);

        // Bind the "About" button to the _showAbout() function
        let aboutAction = new Gio.SimpleAction ({ name: 'about' });
        aboutAction.connect('activate', () => { this._showAbout(); });
        this.application.add_action(aboutAction);

        // Bind the "Quit" button to the function that closes the window
        let quitAction = new Gio.SimpleAction ({ name: 'quit' });
        quitAction.connect('activate', () => { this._window.destroy(); });
        this.application.add_action(quitAction);
    }

    _showAbout() {

        // String arrays of the names of the people involved in the project
        var artists = ['Rob Lee http://en.wikipedia.org/wiki/File:Fuzzy_Freddy.png', 'Ken Funakoshi http://en.wikipedia.org/wiki/File:Pygoscelis_papua_-Nagasaki_Penguin_Aquarium_-swimming_underwater-8a.png', 'Shek Graham http://www.flickr.com/photos/shekgraham/127431519/in/photostream/', 'Mindaugas Urbonas http://commons.wikimedia.org/wiki/File:Mute_Swan-Mindaugas_Urbonas.png'];
        var authors = ["GNOME Documentation Team"];
        var documenters = ["GNOME Documentation Team"];

        // Create the About dialog
        let aboutDialog = new Gtk.AboutDialog({
            title: "AboutDialog Example",
            program_name: "Animal Creator",
            copyright: "Copyright \xa9 2012 GNOME Documentation Team\n\nRed fox photo licensed CC-By by Rob Lee\nGentoo penguin photo licensed CC-By-SA by Ken Funakoshi\nFruit bat photo licensed CC-By by Shek Graham\nMute swan photo licensed CC-By-SA by Mindaugas Urbonas\nLinks to the originals are available under Credits.\n\nHave you hugged a penguin today?",
            artists: artists,
            authors: authors,
            documenters: documenters,
            website: "http://developer.gnome.org",
            website_label: "GNOME Developer Website" });

        // Attach the About dialog to the window
        aboutDialog.modal = true;
        aboutDialog.transient_for = this._window;

        // Show the About dialog
        aboutDialog.show();

        // Connect the Close button to the destroy signal for the dialog
        aboutDialog.connect('response', function() {
            aboutDialog.destroy();
        });
    }
};

// Run the application
let app = new SwitchExample ();
app.application.run (ARGV);
