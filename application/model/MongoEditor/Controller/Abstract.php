<?php
/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 24.03.12
 * Time: 18:21
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Controller_Abstract extends MongoEditor_Property
{
    protected $_params;
    protected $_options;

    public function __construct($params, $options)
    {
        $this->setData(array(
            'params'  => $params,
            'options' => $options
        ));
    }
}