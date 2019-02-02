#include <gtk/gtk.h>

/* Callback function in which reacts to the "response" signal from the user in
 * the message dialog window.
 * This function is used to destroy the dialog window.
 */
static void
on_close (GtkDialog *dialog,
          gint       response_id,
          gpointer   user_data)
{
  /* This will cause the dialog to be destroyed */
  gtk_widget_destroy (GTK_WIDGET (dialog));
}

/* Callback function for the response signal "activate" related to the SimpleAction
 * "about_action".
 * This function is used to cause the about dialog window to popup.
 */
static void
about_cb (GSimpleAction *simple,
          GVariant      *parameter,
          gpointer       user_data)
{
  GtkWidget *about_dialog;

  about_dialog = gtk_about_dialog_new ();

  /* Lists of authors/ documenters to be used later, they must be initialized
   * in a null terminated array of strings.
   */
  const gchar *authors[] = {"GNOME Documentation Team", NULL};
  const gchar *documenters[] = {"GNOME Documentation Team", NULL};

  /* We fill in the information for the about dialog */
  gtk_about_dialog_set_program_name (GTK_ABOUT_DIALOG (about_dialog), "AboutDialog Example");
  gtk_about_dialog_set_copyright (GTK_ABOUT_DIALOG (about_dialog), "Copyright \xc2\xa9 2012 GNOME Documentation Team");
  gtk_about_dialog_set_authors (GTK_ABOUT_DIALOG (about_dialog), authors);
  gtk_about_dialog_set_documenters (GTK_ABOUT_DIALOG (about_dialog), documenters);
  gtk_about_dialog_set_website_label (GTK_ABOUT_DIALOG (about_dialog), "GNOME Developer Website");
  gtk_about_dialog_set_website (GTK_ABOUT_DIALOG (about_dialog), "http://developer.gnome.org");

  /* We do not wish to show the title, which in this case would be
   * "AboutDialog Example". We have to reset the title of the messagedialog
   * window after setting the program name.
   */
  gtk_window_set_title (GTK_WINDOW (about_dialog), "");

  /* To close the aboutdialog when "close" is clicked we connect the response
   * signal to on_close
   */
  g_signal_connect (GTK_DIALOG (about_dialog), "response",
                    G_CALLBACK (on_close), NULL);

  /* Show the about dialog */
  gtk_widget_show (about_dialog);
}

static void
activate (GtkApplication *app,
          gpointer        user_data)
{
  GtkWidget *window;

  GSimpleAction *about_action;

  /* Create a window with a title and a default size */
  window = gtk_application_window_new (app);
  gtk_window_set_title (GTK_WINDOW (window), "AboutDialog Example");
  gtk_window_set_default_size (GTK_WINDOW (window), 200, 200);

  /* Create a new simple action, giving it a NULL parameter type. It will
   * always be NULL for actions invoked from a menu. (e.g clicking on an "ok"
   * or "cancel" button)
   */
  about_action = g_simple_action_new ("about", NULL);

  /* Connect the "activate" signal to the appropriate callback function.
   * It will indicate that the action was just activated.
   */
  g_signal_connect (about_action, "activate", G_CALLBACK (about_cb),
                    GTK_WINDOW (window));

  /* Adds the about_action to the overall action map. An Action map is an
   * interface that contains a number of named GAction instances
   * (such as about_action)
   */
  g_action_map_add_action (G_ACTION_MAP (window), G_ACTION (about_action));

  gtk_widget_show_all (window);
}

/* Callback function for the response signal "activate" from the "quit" action
 * found in the function directly below.
 */
static void
quit_cb (GSimpleAction *simple,
         GVariant      *parameter,
         gpointer       user_data)
{
  GApplication *application = user_data;

  g_application_quit (application);
}

/* Startup function for the menu we are creating in this sample */
static void
startup (GApplication *app,
         gpointer      user_data)
{
  GMenu *menu;
  GSimpleAction *quit_action;

  /* Initialize the GMenu, and add a menu item with label "About" and action
   * "win.about". Also add another menu item with label "Quit" and action
   * "app.quit"
   */
  menu = g_menu_new ();
  g_menu_append (menu, "About", "win.about");
  g_menu_append (menu, "Quit", "app.quit");

  /* Create a new simple action for the application. (In this case it is the
   * "quit" action.
   */
  quit_action = g_simple_action_new ("quit", NULL);

  /* Ensure that the menu we have just created is set for the overall application */
  gtk_application_set_app_menu (GTK_APPLICATION (app), G_MENU_MODEL (menu));

  g_signal_connect (quit_action,
                    "activate",
                    G_CALLBACK (quit_cb),
                    app);

  g_action_map_add_action (G_ACTION_MAP (app), G_ACTION (quit_action));
}

/* Startup function for the application */
int
main (int argc, char **argv)
{
  GtkApplication *app;
  int status;

  app = gtk_application_new ("org.gtk.example", G_APPLICATION_FLAGS_NONE);
  g_signal_connect (app, "activate", G_CALLBACK (activate), NULL);
  g_signal_connect (app, "startup", G_CALLBACK (startup), NULL);
  status = g_application_run (G_APPLICATION (app), argc, argv);
  g_object_unref (app);

  return status;
}
