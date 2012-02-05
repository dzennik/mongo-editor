<?php
/**
 * Created by JetBrains PhpStorm.
 * User: kulitskyd
 * Date: 02.10.11
 * Time: 23:11
 * To change this template use File | Settings | File Templates.
 */

class MongoEditor_Db extends MongoEditor_Property
{
    protected $_connection;
    protected static $_instance;

    protected function __construct()
    {
        $this->_connection = new Mongo();
    }

    public static function getArray($cursor)
    {
        $result = array();
        foreach ($cursor as $key => $value) {
            $result[$key] = $value;
        }

        return $result;
    }

    /**
        *  Return db instance
        *  @param string $name name of database
        *  @return MongoDB
        */
    public static function get($name)
    {
        $connection = MongoEditor_Db::connection();

        if (is_null($name)) {
            return null;
        }

        return $connection->{$name};
    }

    public static function connection()
    {
        return MongoEditor_Db::getInstance()->connection;
    }

    public static function getInstance()
    {
        if (is_null(MongoEditor_Db::$_instance)) {
            MongoEditor_Db::$_instance = new self();
        }

        return MongoEditor_Db::$_instance;
    }
}