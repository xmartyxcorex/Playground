require([
  "namespace",
 
  // Libs
  "jquery",
  "use!backbone",
 
  // Modules
  "modules/book"
],
 
function(namespace, $, Backbone, Book) {
  window.Library = new Book.Collection([
    { id: 1, title: "A Tale of Two Cities", author: "Charles Dickens", published: 1859 },
    { id: 2, title: "The Lord of the Rings", author: "J. R. R. Tolkien", published: 1954 },
    { id: 3, title: "The Hobbit", author: "J. R. R. Tolkien", published: 1937 },
    { id: 4, title: "And Then There Were None", author: "Agatha Christie", published: 1939 }
  ]);
 
  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
      "":   "index"
    },
 
    index: function(){
      var view = new Book.Views.List({collection: Library});
      view.render(function(el){
        $("#main").html(el);
      })
    }
  });
  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // `Backbone.history.navigate` is sufficient for all Routers and will
      // trigger the correct events.  The Router's internal `navigate` method
      // calls this anyways.
      Backbone.history.navigate(href, true);
    }
  });

});
