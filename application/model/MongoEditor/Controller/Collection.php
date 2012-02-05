<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 05.01.12
 * Time: 13:27
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Controller_Collection extends MongoEditor_Property
{
    public function searchAction()
    {
        global $db;

        /**
         * @var MongoCollection $usersCollection
         */
        $usersCollection = $db->users;

        return $usersCollection->find();
    }
}