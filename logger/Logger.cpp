#include "Logger.h"

using namespace LoggerNames;
using namespace std;

Logger::Logger(LoggerType type, string name, LoggerLevel level):
        m_type(type),
        m_name(name),
        m_level(level)
{
    if(type == LoggerType::file)
    {
        m_filebuf.open(name+".LOG", ios_base::app);
        m_stream = new ostream(&m_filebuf);
    }
    else if(type == LoggerType::console)
        m_stream = new ostream(cout.rdbuf());
    m_null = new ostream(nullptr);
}

Logger::~Logger()
{
    if(m_filebuf.is_open())
        m_filebuf.close();
    if(m_stream) delete m_stream;
    if(m_null) delete m_null;
}

std::ostream& Logger::getStream(LoggerLevel level)
{
    if(isValidLevel(level))
    {
        insertLineHeader(level);
        return *m_stream;
    }
    else
        return *m_null;
}

bool Logger::isValidLevel(LoggerLevel level)
{
    return m_level >= level;
}

void Logger::insertLineHeader(LoggerLevel level)
{
    // get level string
    string sLevel;
    switch(level)
    {
        case LoggerLevel::TRACE: sLevel="      TRC"; break;
        case LoggerLevel::DEBUG: sLevel="      DBG"; break;
        case LoggerLevel::INFO: sLevel="   INF   "; break;
        case LoggerLevel::WARN: sLevel="   WRN   "; break;
        case LoggerLevel::ERR: sLevel="ERR      "; break;
        case LoggerLevel::CRIT: sLevel="CRT      "; break;
    }
    // get current time
    auto t = time(nullptr);
    auto tm = *localtime(&t);
    // insert line header
    *m_stream << sLevel << " | " << put_time(&tm, "%d.%m.%Y %H:%M:%S") << " | ";
}
