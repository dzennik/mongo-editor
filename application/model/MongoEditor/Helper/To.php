<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 04.01.12
 * Time: 19:11
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Helper_To extends MongoEditor_Property
{
    public static function arr(MongoCursor $cur, $options = array())
    {
        $result = array();

        foreach ($cur as $key => $userDocument) {

            if (isset($options['withoutObjectId'])) {
                unset($userDocument['_id']);
            }

            if (isset($options['withoutKey'])) {
                $result[] = $userDocument;
            } else {
                $result[$key] = $userDocument;
            }
        }

        return $result;
    }
}
