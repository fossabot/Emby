﻿define(['scripts/livetvcomponents', 'emby-button', 'emby-itemscontainer'], function () {

    function renderTimers(context, timers, options) {

        LiveTvHelpers.getTimersHtml(timers, options).then(function (html) {

            var elem = context;

            if (html) {
                elem.classList.remove('hide');
            } else {
                elem.classList.add('hide');
            }

            elem.querySelector('.recordingItems').innerHTML = html;

            ImageLoader.lazyChildren(elem);
        });
    }

    function renderUpcomingRecordings(context) {

        ApiClient.getLiveTvTimers({
            IsActive: false
        }).then(function (result) {

            renderTimers(context.querySelector('#upcomingRecordings'), result.Items);
            Dashboard.hideLoadingMsg();
        });
    }

    function reload(context) {

        Dashboard.showLoadingMsg();

        renderUpcomingRecordings(context);
    }

    return function (view, params, tabContent) {

        var self = this;

        tabContent.querySelector('#upcomingRecordings .recordingItems').addEventListener('timercancelled', function () {
            reload(tabContent);
        });

        self.renderTab = function () {
            reload(tabContent);
        };
    };

});