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
    protected $_view;

    public function execute()
    {
        $controllerClassName = 'MongoEditor_Controller_' . ucfirst($this->_controller);
        $actionFunction = $this->_action . 'Action';
        $viewClassName = 'MongoEditor_View_' . ucfirst($this->_controller);
        $viewFunction = $this->_view . 'View';

        $controllerClass = new $controllerClassName();

        $result = $controllerClass->{$actionFunction}();

        $viewClass = new $viewClassName($result);

        return $viewClass->$viewFunction();
    }

    public function __construct($controller, $action, $view, $options = array())
    {
        $this->setData(array(
            'controller' => $controller,
            'action'     => $action,
            'view'       => $view,
            'options'    => $options
        ));
    }
}