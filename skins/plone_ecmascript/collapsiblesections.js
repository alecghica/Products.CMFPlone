/*
 * This is the code for the collapsibles. It uses the following markup:
 *
 * <dl class="collapsible">
 *   <dt class="collapsibleHeader">
 *     A Title
 *   </dt>
 *   <dd class="collapsibleContent">
 *     <!-- Here can be any content you want -->
 *   </dd>
 * </dl>
 *
 * When the collapsible is toggled, then the dl will get an additional class
 * which switches between 'collapsedBlockCollapsible' and
 * 'expandedBlockCollapsible'. You can use this to style it accordingly, for
 * example:
 *
 * .expandedBlockCollapsible .collapsibleContent {
 *   display: block;
 * }
 *
 * .collapsedBlockCollapsible .collapsibleContent {
 *   display: none;
 * }
 *
 * If you add the 'collapsedOnLoad' class to the dl, then it will get
 * collapsed on page load, this is done, so the content is accessible even when
 * javascript is disabled.
 *
 * If you add the 'inline' class to the dl, then it will toggle between
 * 'collapsedInlineCollapsible' and 'expandedInlineCollapsible' instead of
 * 'collapsedBlockCollapsible' and 'expandedBlockCollapsible'.
 *
 */

(function() {
_toggleCollapsible = function() {
    var $container = jq(this).parents('dl.collapsible:first');
    if (!$container) return true;

    var $type = $container.hasClass('inline') ? 'Inline' :'Block';
    // toggle between collapsed and expanded classes
    $container.toggleClass('collapsed' + $type + 'Collapsible')
              .toggleClass('expanded' + $type + 'Collapsible');
};

jq(function() {
    jq('dl.collapsible dt.collapsibleHeader:first').click(_toggleCollapsible);
    jq('dl.collapsible').each(function() {
        var $state = jq(this).hasClass('collapsedOnLoad') ?
                     'collapsed' : 'expanded';
        var $type = jq(this).hasClass('inline') ? 'Inline' :'Block';
        jq(this).removeClass('collapsedOnLoad')
               .addClass($state + $type + 'Collapsible');
    });
});
})();