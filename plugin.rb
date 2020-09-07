# name: plugin-toxic-tags
# about:  Exposes toxic tags to the frontend
# version: 0.0.1
# authors: Terrapop

enabled_site_setting :plugin_toxic_tags_enabled

after_initialize do

  add_to_serializer :topic_view, :tags_toxic_ads do
    return false if !SiteSetting.tagging_enabled || !SiteSetting.expose_these_toxic_tags.present?
    return false if object.topic.tags.empty?
    !(SiteSetting.expose_these_toxic_tags.split('|') & object.topic.tags.map(&:name)).empty?
  end

end