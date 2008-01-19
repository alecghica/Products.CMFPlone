function highlightTermInNode(node, word) {
    var contents = node.nodeValue;
    if (jq(node).parent().hasClass("highlightedSearchTerm")) return;
    
    while (contents && (index = contents.toLowerCase().indexOf(word)) > -1) {
        // replace the node with [before]<span>word</span>[after]
        jq(node)
            .before(document.createTextNode(contents.substr(0, index)))
            .before(
                jq('<span>')
                    .addClass("highlightedSearchTerm")
                    .text(contents.substr(index, word.length))
            )
            .before(document.createTextNode(contents.substr(index+word.length)));
        var next = node.previousSibling; // text after the span
        jq(node).remove(); 
        // wash, rinse and repeat
        node = next; contents = node.nodeValue;
    }
}

function highlightSearchTerms(terms, startnode) {
    if (!terms || !startnode) return;
    terms = jq.map(terms, 'a.toLowerCase()');

    jq.each(terms, function(i, term) {
        // don't highlight reserved catalog search terms
        if (!term || /(not|and|or)/.test(term)) return;
        jq(startnode).find('*').andSelf().contents().each(function() {
            if (this.nodeType == 3) highlightTermInNode(this, term);
        });
    });
}

function getSearchTermsFromURI(uri) {
    var query;
    if (typeof decodeURI != 'undefined') {
        query = decodeURI(uri);
    } else if (typeof unescape != 'undefined') {
        // _robert_ ie 5 does not have decodeURI 
        query = unescape(uri);
    } else {
        // we just try to be lucky, for single words this will still work
    }
    var result = new Array();
    if (window.decodeReferrer) {
        var referrerSearch = decodeReferrer();
        if (null != referrerSearch && referrerSearch.length > 0) {
            result = referrerSearch;
        }
    }
    var qfinder = new RegExp("(searchterm|SearchableText)=([^&]*)", "gi");
    var qq = qfinder.exec(query);
    if (qq && qq[2]) {
        var terms = qq[2].replace(/\+/g,' ').split(' ');
        result.push.apply(result, jq.grep(terms, 'a != ""'));
        return result;
    }
    return result.length == 0 ? false : result;
}

jq(function() {
    // search-term-highlighter function --  Geir Baekholt
    var terms = getSearchTermsFromURI(window.location.search);
    // make sure we start the right place so we don't higlight menuitems or breadcrumb
    highlightSearchTerms(terms, getContentArea());
});

