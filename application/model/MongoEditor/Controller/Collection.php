<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 05.01.12
 * Time: 13:27
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Controller_Collection extends MongoEditor_Controller_Abstract
{
    public function searchAction()
    {
        global $db;

        /**
                 * @var MongoCollection $booksCollection
                 */
        $booksCollection = $db->books;

        return MongoEditor_Helper_To::arr($booksCollection->find());
    }

    public function saveAction()
    {
        global $db;

        /**
                 * @var MongoCollection $booksCollection
                 */
        $booksCollection = $db->books;

        $document = $this->_params['document'];

        $document['_id'] = new MongoId($document['_id']['$id']);

        $booksCollection->save($document);
    }
}