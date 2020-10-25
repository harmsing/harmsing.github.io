$(function () {
    var items = [];

    $("#data").hide();

    $("#data > .item").each(function () {
        var tags = [];

        $(this).find("[data-tag]").each(function () {
            var tagName = $(this).data("tag");
            var tagValue = $(this).text();
            tags.push({name: tagName, value: tagValue});
        });

        items.push({tags: tags});
    });

    function groupBy(items, tagName) {
        var groups = {};

        items.forEach(function (item) {
            item.tags.forEach(function (tag) {
                if (tag.name === tagName) {
                    groups[tag.value] = groups[tag.value] || [];
                    groups[tag.value].push(item);
                }
            });
        });

        return groups;
    }

    function render(groups) {
        var $gallery = $("#gallery").empty();

        var groupNames = Object.keys(groups).sort();

        groupNames.forEach(function (groupName) {
            var $group = $('<div class="group"><h3 class="mt-3"></h3><div class="images" style="margin-left: -15px; margin-right: -15px;"></div></div>');
            $group.find("h3").html(groupName);

            var $images = $group.find(".images");

            groups[groupName].forEach(function (item) {
                item.tags.forEach(function (tag) {
                    if (tag.name === "image") {
                        var $image = $('<a href="" target="_blank"><img src="" alt=""></a>');
                        var previewUrl = "images/" + tag.value + "_.jpg";
                        var fullSizeUrl = "images/" + tag.value + ".jpg";
                        $image.attr("href", fullSizeUrl);
                        $image.find("img").attr("src", previewUrl);

                        $images.append($image);
                    }
                });
            });

            $gallery.append($group);
        });
    }

    function groupAction(tagName) {
        var groups = groupBy(items, tagName);
        render(groups);
    }

    $("#group_by").change(function () {
        groupAction($(this).val());
    }).change();
});
