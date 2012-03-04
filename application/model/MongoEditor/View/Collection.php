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
    protected $_documents;

    public function getChildren($array, $parentId)
    {
        $result = array();
        foreach ($array as $key => $value) {
            if ($key === '_id') {
                continue;
            }

            if (is_object($value)) {
                continue;
            }

            $id = $parentId . '-' . $key;

            if (is_array($value)) {
                $node = array(
                    'id'       => $id,
                    'key'      => $key,
                    'value'    => '',
                    'children' => $this->getChildren($value, $id),
                    'state'    => 'closed'
                );
            } else {
                $node = array(
                    'id'    => $id,
                    'key'   => $key,
                    'value' => $value
                );
            }

            if ($parentId === 'col') {
                $node['object'] = $value;
            }

            $result[] = $node;
        }

        return $result;
    }

    public function treeGridView()
    {
        return array_merge($this->getChildren($this->_documents, 'col'));
    }

    public function __construct($documents)
    {
        $this->_documents = $documents;
    }
}