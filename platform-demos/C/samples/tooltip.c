#include <gtk/gtk.h>

static gboolean 
undo_tooltip_callback (GtkStatusIcon *status_icon,
                       gint           x,
                       gint           y,
                       gboolean       keyboard_mode,
                       GtkTooltip    *tooltip,
                       gpointer       user_data)
{
  /* set the text for the tooltip */
  gtk_tooltip_set_text (tooltip, "Undo your last action");
   
  /* set an icon for the tooltip */
  gtk_tooltip_set_icon_from_stock(tooltip, "gtk-undo", GTK_ICON_SIZE_MENU);

  /* show the tooltip */
  return TRUE;
}


static void
undo_callback (GSimpleAction *simple,
               GVariant      *parameter,
               gpointer       user_data)
{
  g_print ("You clicked \"Undo\".\n");
}


static void
activate (GtkApplication *app,
          gpointer        user_data)
{
  GtkWidget *grid;
  GtkWidget *window;
  GtkWidget *toolbar;

  GtkToolItem *new_button;
  GtkToolItem *open_button;
  GtkToolItem *undo_button;

  GtkStyleContext *style_context;

  GSimpleAction *undo_action;

  window = gtk_application_window_new (app);
  gtk_window_set_title (GTK_WINDOW (window), "Toolbar with Tooltips Example");
  gtk_window_set_default_size (GTK_WINDOW (window), 400, 200);

  /* Here we begin to create the toolbar */
  toolbar = gtk_toolbar_new ();

  /* Set the toolbar to be the primary toolbar of the application */
  style_context = gtk_widget_get_style_context (toolbar);
  gtk_style_context_add_class (style_context, GTK_STYLE_CLASS_PRIMARY_TOOLBAR);

  /* Create a button for the "new" action, with a stock image */
  new_button = gtk_tool_button_new_from_stock (GTK_STOCK_NEW);
  gtk_tool_item_set_is_important (new_button, TRUE);
  gtk_toolbar_insert (GTK_TOOLBAR (toolbar), new_button, 0);
  gtk_widget_show (GTK_WIDGET (new_button));

  /* Set the action name for the "new" action. We use "app.new" to
   * indicate that the action controls the application.
   */
  gtk_actionable_set_action_name (GTK_ACTIONABLE (new_button), "app.new");

  /*******************************
   * Tooltip for the New ToolItem:
   * a tooltip with text
   *******************************/
   gtk_tool_item_set_tooltip_text (new_button, "Create a new file");  

  /* "Open" */
  open_button = gtk_tool_button_new_from_stock (GTK_STOCK_OPEN);
  gtk_tool_item_set_is_important (open_button, TRUE);
  gtk_toolbar_insert (GTK_TOOLBAR (toolbar), open_button, 1);
  gtk_widget_show (GTK_WIDGET (open_button));
  gtk_actionable_set_action_name (GTK_ACTIONABLE (open_button), "app.open");

  /*******************************
   * Tooltip for the Open ToolItem:
   * a tooltip using Pango markup 
   * language
   *******************************/
  gtk_tool_item_set_tooltip_text (open_button, "Open an <i>existing</i> file");

  /* "Undo" */
  undo_button = gtk_tool_button_new_from_stock (GTK_STOCK_UNDO);
  gtk_tool_item_set_is_important (undo_button, TRUE);
  gtk_toolbar_insert (GTK_TOOLBAR (toolbar), undo_button, 2);
  gtk_widget_show (GTK_WIDGET (undo_button));

  /* In this case, we use "win.undo" to indicate that
   * the action controls only the window
   */
  gtk_actionable_set_action_name (GTK_ACTIONABLE (undo_button), "win.undo");

  /*******************************
   * Tooltip for the Undo ToolItem:
   * a tooltip with an image
   *******************************/
  gtk_widget_set_has_tooltip (GTK_WIDGET (undo_button), TRUE);

  // Next, we connect the query_tooltip signal
  g_signal_connect (undo_button, "query-tooltip", G_CALLBACK (undo_tooltip_callback), NULL);

  gtk_widget_set_hexpand (toolbar, TRUE);
  gtk_widget_show (toolbar);

  grid = gtk_grid_new ();
  gtk_grid_attach (GTK_GRID (grid), toolbar, 0, 0, 1, 1);
  gtk_container_add (GTK_CONTAINER (window), GTK_WIDGET (grid));
  gtk_widget_show (GTK_WIDGET (grid));

  /* Use the action names to create the actions that control the window, and
   * connect them to the appropriate callbackfunctions.
   */
  undo_action = g_simple_action_new ("undo", NULL);
  g_signal_connect (undo_action, "activate", G_CALLBACK (undo_callback),
                    GTK_WINDOW (window));
  g_action_map_add_action (G_ACTION_MAP (window), G_ACTION (undo_action));

  gtk_widget_show (window);
}


/* Callback function for the new action */
static void
new_callback (GSimpleAction *simple,
              GVariant      *parameter,
              gpointer       user_data)
{
  g_print ("You clicked \"New\".\n");
}


/* Callback function for the open action */
static void
open_callback (GSimpleAction *simple,
               GVariant      *parameter,
               gpointer       user_data)
{
  g_print ("You clicked \"Open\".\n");
}


/* In this function, we create the actions in which control the window, and
 * connect their signals to the appropriate callback function.
 */
static void
startup (GApplication *app,
         gpointer      user_data)
{
  GSimpleAction *new_action;
  GSimpleAction *open_action;

  new_action = g_simple_action_new ("new", NULL);
  g_signal_connect (new_action, "activate", G_CALLBACK (new_callback), app);
  g_action_map_add_action (G_ACTION_MAP (app), G_ACTION (new_action));

  open_action = g_simple_action_new ("open", NULL);
  g_signal_connect (open_action, "activate", G_CALLBACK (open_callback), app);
  g_action_map_add_action (G_ACTION_MAP (app), G_ACTION (open_action));
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
