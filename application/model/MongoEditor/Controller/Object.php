<?php
/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 09.04.12
 * Time: 22:44
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Controller_Object extends MongoEditor_Controller_Abstract
{
    public function listAction()
    {
        $mongo = new Mongo();

        $list = $mongo->listDBs();

        return $list;
    }
}