class ReactChannel < ApplicationCable::ReactChannel
  def subscribed
    stream_from 'react_channel'
  end

  def unsubscribed; end

  def create(opts)
    opts.fetch('content')
    
  end
end
