<?php
/**
 * Created by JetBrains PhpStorm.
 * User: dkulitsky
 * Date: 04.01.12
 * Time: 17:30
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Application
{
    protected $_title = 'MongoDB Editor';
    protected $_db;

    protected static $_instance;

    public static function autoloader($className)
    {
        $classPath = 'model/' . str_replace('_', '/', $className);

        require $classPath . '.php';
    }

    public function title()
    {
        return $this->_title;
    }

    public function baseUrl()
    {
        return 'http://mongo-editor/';
    }

    public function initAutoloader()
    {
        spl_autoload_register(array(__CLASS__, 'autoloader'));
    }

    public function initDB()
    {
        $this->_db = MongoEditor_Db::get('easyui');
    }

    protected function __construct()
    {
        $this->initAutoloader();

        $this->initDB();
    }

    public static function getInstance()
    {
        if (!isset(self::$_instance)) {
            self::$_instance = new self();
        }

        return self::$_instance;
    }

    public function getContent()
    {
        ob_start();
        include(APPLICATION_PATH . '/layouts/layout.phtml');
        $content = ob_get_clean();

        return $content;
    }

    public function getDB()
    {
        return $this->_db;
    }
}