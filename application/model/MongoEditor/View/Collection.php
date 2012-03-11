<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 05.01.12
 * Time: 13:30
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_View_Collection extends MongoEditor_Property
{
    /** @var MongoCursor */
    protected $_documents;

    public function treeGridView()
    {
        return MongoEditor_Helper_To::arr($this->_documents);
    }

    public function __construct($documents)
    {
        $this->_documents = $documents;
    }
}