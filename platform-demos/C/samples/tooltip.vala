/* This is the Window */
class MyWindow : Gtk.ApplicationWindow {

	/* Instance variables belonging to the window */
	Gtk.Toolbar toolbar;
	Gtk.ToolButton new_button;
	Gtk.ToolButton open_button;
	Gtk.ToolButton undo_button;
	Gtk.ToolButton fullscreen_button;
	Gtk.ToolButton leave_fullscreen_button;

	/* Constructor */
	internal MyWindow (MyApplication app) {
		Object (application: app, title: "Toolbar with Tooltips Example");

		this.set_default_size (400, 200);
		var grid = new Gtk.Grid ();
		this.add (grid);
		grid.show ();

		create_toolbar ();
		toolbar.set_hexpand (true);
		grid.attach (toolbar, 0, 0, 1, 1);
		toolbar.show ();

		/* create the "undo" window action action */
		var undo_action = new SimpleAction ("undo", null);
		undo_action.activate.connect (undo_callback);
		this.add_action (undo_action);

		/* create the "fullscreen" window action */
		var fullscreen_action = new SimpleAction ("fullscreen", null);
		fullscreen_action.activate.connect (fullscreen_callback);
		this.add_action (fullscreen_action);
	}

	/* Callback for query_tooltip signal */
	bool undo_tooltip_callback (int x, int y, bool keyboard_tooltip, Gtk.Tooltip tooltip) {

		/* set the text for the tooltip */
        	tooltip.set_text ("Undo your last action");
		
		/* set an icon for the tooltip */
		tooltip.set_icon_from_stock("gtk-undo", Gtk.IconSize.MENU);

        	/* show the tooltip */
        	return true;
	}

	/* This function creates the toolbar, its  ToolButtons,
	 * and assigns the actions names to the ToolButtons.*/
	void create_toolbar () {
		toolbar = new Gtk.Toolbar ();
		toolbar.get_style_context ().add_class (Gtk.STYLE_CLASS_PRIMARY_TOOLBAR);

		new_button = new Gtk.ToolButton.from_stock (Gtk.Stock.NEW);

		/* tooltip with text */
		new_button.set_tooltip_text ("Create a new file");

		new_button.is_important = true; //decides whether to show the label
		toolbar.add (new_button);
		new_button.show ();
		new_button.action_name = "app.new";

		open_button = new Gtk.ToolButton.from_stock (Gtk.Stock.OPEN);

		/* a tooltip using Pango markup language */
		open_button.set_tooltip_markup ("Open an <i>existing</i> file");

		open_button.is_important = true;
		toolbar.add (open_button);
		open_button.show ();
		open_button.action_name = "app.open";

		undo_button = new Gtk.ToolButton.from_stock (Gtk.Stock.UNDO);
	
		/* For a tooltip to have an image, first we must set_has_tooltip to be 'true' */	
		(undo_button as Gtk.Widget).set_has_tooltip (true);

		/* Connect the query_tooltip signal to the callback */
		undo_button.query_tooltip.connect (undo_tooltip_callback);
	
		undo_button.is_important = true;
		toolbar.add (undo_button);
		undo_button.show ();
		undo_button.action_name = "win.undo";

		fullscreen_button = new Gtk.ToolButton.from_stock (Gtk.Stock.FULLSCREEN);
		fullscreen_button.is_important = true;
		toolbar.add (fullscreen_button);
		fullscreen_button.show ();
		fullscreen_button.action_name = "win.fullscreen";

		leave_fullscreen_button = new Gtk.ToolButton.from_stock (Gtk.Stock.LEAVE_FULLSCREEN)
;
		leave_fullscreen_button.is_important = true;
		toolbar.add (leave_fullscreen_button);

		leave_fullscreen_button.action_name = "win.fullscreen";
	}

	void undo_callback (SimpleAction simple, Variant? parameter) {
			print ("You clicked \"Undo\".\n");
	}

	void fullscreen_callback (SimpleAction simple, Variant? parameter) {
		if ((this.get_window ().get_state () & Gdk.WindowState.FULLSCREEN) != 0) {
			this.unfullscreen ();
			leave_fullscreen_button.hide ();
			fullscreen_button.show ();
		}
		else {
			this.fullscreen ();
			fullscreen_button.hide ();
			leave_fullscreen_button.show ();
		}
	}
}

/* This is the application */
class MyApplication : Gtk.Application {
	protected override void activate () {
		new MyWindow (this).show ();
	}

	protected override void startup () {
		base.startup ();

		/* Create the "new" action and add it to the app*/
		var new_action = new SimpleAction ("new", null);
		new_action.activate.connect (new_callback);
		this.add_action (new_action);

		/* Create the "open" action, and add it to the app */
		var open_action = new SimpleAction ("open", null);
		open_action.activate.connect (open_callback);
		this.add_action (open_action);

		/* You could also add the action to the app menu
		 * if you wanted to.
		 */
		//var menu = new Menu ();
		//menu.append ("New", "app.new");
		//this.app_menu = menu;
	}

	void new_callback (SimpleAction action, Variant? parameter) {
		print ("You clicked \"New\".\n");
	}

	void open_callback (SimpleAction action, Variant? parameter) {
			print ("You clicked \"Open\".\n");
	}
}

/* The main function creates the application and runs it. */
int main (string[] args) {
	return new MyApplication ().run (args);
}
