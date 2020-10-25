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

    function tagValues(tags, tagName) {
        var values = [];
        tags.forEach(function (tag) {
            if (tag.name === tagName) {
                values.push(tag.value);
            }
        });
        return values;
    }

    function getTagString(tags, tagName) {
        return tagValues(tags, tagName).join(", ");
    }

    function render(groups) {
        var $gallery = $("#gallery").empty();
        var $tableBody = $("#table_view_body").empty();

        var groupNames = Object.keys(groups).sort();

        groupNames.forEach(function (groupName) {
            var $group = $('<div class="group"><h3 class="mt-3"></h3><div class="images" style="margin-left: -15px; margin-right: -15px;"></div></div>');
            $group.find("h3").html(groupName);

            var $images = $group.find(".images");

            $tableBody.append('<tr><th colspan="6">' + groupName + '</th></tr>')

            groups[groupName].forEach(function (item) {
                item.tags.forEach(function (tag) {
                    if (tag.name === "image") {
                        var $image = $('<a href=""><img src="" alt=""></a>');
                        var previewUrl = "images/" + tag.value + "_.jpg";
                        var fullSizeUrl = "images/" + tag.value + ".jpg";
                        $image.attr("href", fullSizeUrl).attr("data-fancybox", groupName);
                        $image.find("img").attr("src", previewUrl);

                        $images.append($image);
                    }
                });

                var cells = ["series", "number", "year", "case-type", "n-games", "game"].map(function (tagName) {
                    return "<td>" + getTagString(item.tags, tagName) + "</td>";
                }).join("");

                var row = "<tr>" + cells + "</tr>";

                $tableBody.append(row);
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

    $("[name=view]").change(function () {
        if ($("[name=view]:checked").val() === "gallery") {
            $("#gallery").show();
            $("#table").hide();
        } else {
            $("#gallery").hide();
            $("#table").show();
        }
    });
});
