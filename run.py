# Run a test server.
import argparse
from app import create_app


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description='Runs BabyNames.')
    parser.add_argument('--port', '-p', action='store', default=8000, type=int)
    args = parser.parse_args()

    app = create_app(debug=True)
    app.run(host='0.0.0.0', debug=True, port=args.port)
    import pdb; pdb.set_trace()
    print 'xxxx'
