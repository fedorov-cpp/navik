#ifndef MAESTROSERVER_LOGGER_H
#define MAESTROSERVER_LOGGER_H

#include <iostream>
#include <fstream>
#include <ctime>
#include <iomanip>

/*
 * HOW TO:
 * 1. create Logger instance
 * 2. call proper level function {trc, dbg, inf, ...}
 *
 */

namespace LoggerNames {
    enum class LoggerType { file, console };
    enum class LoggerLevel { TRACE, DEBUG, INFO, WARN, ERR, CRIT };

    class Logger
    {
    public:
        /* @type defines where log messages should be printed */
        /* @name defines log filename */
        /* @level limits messages from appearing in log */
        Logger(LoggerType type, std::string name, LoggerLevel level);
        ~Logger();
        inline std::ostream& trc() { return getStream(LoggerLevel::TRACE); }
        inline std::ostream& dbg() { return getStream(LoggerLevel::DEBUG); }
        inline std::ostream& inf() { return getStream(LoggerLevel::INFO); }
        inline std::ostream& wrn() { return getStream(LoggerLevel::WARN); }
        inline std::ostream& err() { return getStream(LoggerLevel::ERR); }
        inline std::ostream& crt() { return getStream(LoggerLevel::CRIT); }
        inline std::string getName() { return m_name; }
    private:
        LoggerType m_type;
        std::string m_name;
        LoggerLevel m_level;

        std::ostream *m_stream;
        std::filebuf m_filebuf;
        std::ostream *m_null;

        std::ostream& getStream(LoggerLevel level);
        bool isValidLevel(LoggerLevel level);
        void insertLineHeader(LoggerLevel level);
    };
}


#endif //MAESTROSERVER_LOGGER_H
