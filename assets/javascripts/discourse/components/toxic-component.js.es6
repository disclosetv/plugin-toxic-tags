import discourseComputed from "discourse-common/utils/decorators";

export default Ember.Component.extend({
    router: Ember.inject.service(),

    // Server needs to compute this in case hidden tags are being used.
    topicTagsToxic: Ember.computed.alias(
        "router.currentRoute.parent.attributes.tags_toxic_ads"
    ),

    @discourseComputed(
        "router.currentRoute.attributes.__type",
        "router.currentRoute.attributes.id"
    )
    topicListTag(type, tag) {
        if (type === "tag" && tag) {
            return tag;
        }
    },

    @discourseComputed(
        "topicTagsToxic",
        "topicListTag",
    )
    showOnCurrentPage(
        topicTagsToxic,
        topicListTag
    ) {
        return (
            !topicTagsToxic &&
            (!topicListTag ||
                !this.siteSettings.no_ads_for_tags_toxic ||
                !this.siteSettings.no_ads_for_tags_toxic.split("|").includes(topicListTag))
        );
    },

});