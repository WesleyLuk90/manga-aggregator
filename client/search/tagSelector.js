import angular from 'angular';
import _ from 'lodash';

class TagSelectorController {
    constructor() {
        'ngInject';

        this.includedTags = [];
        this.excludedTags = [];
    }

    getSearchableTags() {
        return this.tags;
    }

    toggleTag(tag) {
        if (this.isTagIncluded(tag)) {
            if (this.canExcludeTags) {
                this.excludeTag(tag);
            } else {
                this.clearTag(tag);
            }
        } else if (this.isTagExcluded(tag)) {
            this.clearTag(tag);
        } else {
            this.includeTag(tag);
        }
        this.onSelectionChange({
            includedTags: this.includedTags,
            excludedTags: this.excludedTags,
        });
    }

    isTagIncluded(tag) {
        return _(this.includedTags).includes(tag);
    }

    isTagExcluded(tag) {
        return _(this.excludedTags).includes(tag);
    }

    includeTag(tag) {
        this.clearTag(tag);
        this.includedTags.push(tag);
    }

    excludeTag(tag) {
        this.clearTag(tag);
        this.excludedTags.push(tag);
    }

    clearTag(tag) {
        _.pull(this.excludedTags, tag);
        _.pull(this.includedTags, tag);
    }

    getButtonClass(tag) {
        const classes = ['tag-toggle'];
        if (this.isTagIncluded(tag)) {
            classes.push('btn-success');
        } else if (this.isTagExcluded(tag)) {
            classes.push('btn-danger');
        } else {
            classes.push('btn-default');
        }
        return classes;
    }
}

export default angular.module('mangaApp.tagSelector', [])
    .component('tagSelector', {
        bindings: {
            tags: '<',
            canExcludeTags: '<',
            onSelectionChange: '&',
        },
        template: require('./tagSelector.pug')(),
        controller: TagSelectorController,
    })
    .name;
