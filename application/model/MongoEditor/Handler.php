<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 05.01.12
 * Time: 13:32
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Handler extends MongoEditor_Property
{
    protected $_controller;
    protected $_action;
    protected $_options;
    protected $_params;

    public function execute()
    {
        $controllerClassName = 'MongoEditor_Controller_' . ucfirst($this->_controller);
        $actionFunction = $this->_action . 'Action';

        $controllerClass = new $controllerClassName($this->_params, $this->_options);

        return $controllerClass->{$actionFunction}();
    }

    public function __construct($controller, $action, $params, $options = array())
    {
        $this->setData(array(
            'controller' => $controller,
            'action'     => $action,
            'params'     => $params,
            'options'    => $options
        ));
    }
}