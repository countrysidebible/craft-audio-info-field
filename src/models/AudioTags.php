<?php
/**
 * Craft Audio Info Field plugin for Craft CMS 3.x
 *
 * Get file details, and write file tags.
 *
 * @link      thisanimus.com
 * @copyright Copyright (c) 2018 Andrew Hale
 */

namespace cbcsouthlake\craftaudioinfofield\models;

use cbcsouthlake\craftaudioinfofield\CraftAudioInfoField;

use Craft;
use craft\base\Model;

/**
 * AudioTags Model
 *
 * Models are containers for data. Just about every time information is passed
 * between services, controllers, and templates in Craft, it’s passed via a model.
 *
 * https://craftcms.com/docs/plugins/models
 *
 * @author    Andrew Hale
 * @package   CraftAudioInfoField
 * @since     1.0.0
 */
class AudioTags extends Model
{
    // Public Properties
    // =========================================================================

    /**
     * Some model attribute
     *
     * @var string
     */
    public $someAttribute = 'Some Default';
    public $mediaBaseUrl = 'Media Base URL';
    public $awsId = 'AWS ID';
    public $awsSecretKey = 'AWS Secret Key';

    // Public Methods
    // =========================================================================

    /**
     * Returns the validation rules for attributes.
     *
     * Validation rules are used by [[validate()]] to check if attribute values are valid.
     * Child classes may override this method to declare different validation rules.
     *
     * More info: http://www.yiiframework.com/doc-2.0/guide-input-validation.html
     *
     * @return array
     */
    public function doTags(){
        
    }

    public function rules()
    {
        return [
            ['mediaBaseUrl', 'string'],
            ['mediaBaseUrl', 'default', 'value' => 'Media Base Url'],
            ['awsId', 'string'],
            ['awsId', 'default', 'value' => 'AWS ID'],
            ['awsSecretKey', 'string'],
            ['awsSecretKey', 'default', 'value' => 'AWS Secret Key'],
        ];
    }
}
